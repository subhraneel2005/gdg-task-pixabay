import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma"; // Import your Prisma client
import { getCurrentUser } from "@/providers/session"; // Import your user session management

export async function POST(request: NextRequest) {
  try {
    // Get the current user
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = user.email;
    const dbUser = await prisma.user.findUnique({
      where: { email: userEmail! },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { imageId, webformatURL, largeImageURL, uploader, tags } = await request.json();

    if (!imageId || !webformatURL || !largeImageURL || !uploader || !tags) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const bookmarkedImage = await prisma.bookmarkedImage.create({
      data: {
        userId: dbUser.id,
        imageId,
        webformatURL,
        largeImageURL,
        uploader,
        tags,
      },
    });

    return NextResponse.json(bookmarkedImage, { status: 201 });
  } catch (error) {
    console.error("Error bookmarking image:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
    try {
      // Get the current user
      const user = await getCurrentUser();
  
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      const userEmail = user.email;
      const dbUser = await prisma.user.findUnique({
        where: { email: userEmail! },
      });
  
      if (!dbUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      // Retrieve all bookmarked images for the current user
      const bookmarkedImages = await prisma.bookmarkedImage.findMany({
        where: { userId: dbUser.id },
      });
  
      return NextResponse.json(bookmarkedImages, { status: 200 });
    } catch (error) {
      console.error("Error fetching bookmarked images:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
  try {
    // Get the current user
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = user.email;
    const dbUser = await prisma.user.findUnique({
      where: { email: userEmail! },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { imageId } = await request.json();

    if (!imageId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if the bookmarked image exists
    const bookmarkedImage = await prisma.bookmarkedImage.findUnique({
      where: {
        id: imageId, // assuming imageId is the primary key of the bookmarkedImage model
      },
    });

    if (!bookmarkedImage) {
      return NextResponse.json({ error: "Bookmark not found" }, { status: 404 });
    }

    // Delete the bookmarked image
    await prisma.bookmarkedImage.delete({
      where: {
        id: imageId,
      },
    });

    return NextResponse.json({ message: "Bookmark deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting bookmarked image:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}