import connectDB from '../../../lib/mongodb';
import Capsule from '../../../model/Capsule';
import User from '../../../model/User';

export async function GET(request) {
  await connectDB();
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');
    if (!email) {
      throw new Error('email is required');
    }
    const user = await User.findOne({ email });
    const capsules = await Capsule.find({ ownerId: user }).populate('ownerId');
    return new Response(JSON.stringify(capsules.map(capsule => ({
      _id: capsule._id,
      createdAt: capsule.createdAt,
      title: capsule.title,
      deliveryDate: capsule.deliveryDate,
      visibility: capsule.visibility,
      tags: capsule.tags,
    }))), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Error fetching capsules', { status: 500 });
  }
}

export async function POST(request) {
  await connectDB();
  const { title,
    description,
    deliveryDate,
    visibility,
    tags,
    email } = await request.json();

    const user = await User.findOne({ email });

  const newCapsule = new Capsule({
    title,
    description,
    deliveryDate,
    visibility,
    tags,
    ownerId: user._id
  });

  try {
    await newCapsule.save();
    return new Response('Capsule created successfully', { status: 201 });
  } catch (error) {
    return new Response('Error creating capsule'+error, { status: 400 });
  }
}

export async function DELETE(request) {
  await connectDB();
  try {
    const url = new URL(request.url);
    const capsuleId = url.searchParams.get('id');
    if (!capsuleId) {
      throw new Error('Capsule ID is required');
    }
    console.log(capsuleId);
    const deletedCapsule = await Capsule.findByIdAndDelete(capsuleId);
    if (!deletedCapsule) {
      return new Response('Capsule not found', { status: 404 });
    }
    return new Response('Capsule deleted successfully', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Error deleting capsule', { status: 500 });
  }
}
