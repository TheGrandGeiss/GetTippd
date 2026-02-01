'use server';

import prisma from '../prisma';

export async function checkUserStatus(walletAddress: string) {
  if (!walletAddress) return { error: 'No address' };

  try {
    const user = await prisma.user.findUnique({
      where: { walletAddress },
      select: { username: true },
    });

    return { exists: !!user, username: user?.username };
  } catch (error) {
    console.error('Check Error:', error);
    return { error: 'Failed to check user' };
  }
}

export async function createUser(data: {
  walletAddress: string;
  username: string;
  displayName: string;
  bio: string;
}) {
  const { walletAddress, username, displayName, bio } = data;

  if (!walletAddress || !username)
    return { success: false, error: 'Missing data' };

  try {
    // Basic validation
    const cleanUsername = username.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Check if taken
    const existing = await prisma.user.findUnique({
      where: { username: cleanUsername },
    });
    if (existing) return { success: false, error: 'Username taken' };

    // Create
    await prisma.user.create({
      data: {
        walletAddress,
        username: cleanUsername,
        displayName,
        bio,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Create Error:', error);
    return { success: false, error: 'Failed to create profile' };
  }
}

// ... existing imports and functions

// 3. CHECK: Specific check for username availability
export async function checkUsernameAvailable(username: string) {
  if (!username || username.length < 3) return false;

  const cleanUsername = username.toLowerCase().replace(/[^a-z0-9]/g, '');

  try {
    const user = await prisma.user.findUnique({
      where: { username: cleanUsername },
    });
    // If user is null, the username IS available (return true)
    // If user exists, the username IS NOT available (return false)
    return !user;
  } catch (error) {
    return false; // Fail safe
  }
}
