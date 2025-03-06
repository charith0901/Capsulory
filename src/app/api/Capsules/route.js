import connectDB from '../../../lib/mongodb';
import Capsule from '../../../model/Capsule';

export async function GET(request) {
  await connectDB();
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    if (!userId) {
      throw new Error('userId is required');
    }
    const capsules = await Capsule.find({ userId }).populate('userId');
    return new Response(JSON.stringify(capsules), { status: 200 });
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
    mediaAttachments,
    tags,
    ownerId } = await request.json();

  const newCapsule = new Capsule({
    title,
    description,
    deliveryDate,
    visibility,
    mediaAttachments,
    tags,
    ownerId
  });

  try {
    await newCapsule.save();
    return new Response('Capsule created successfully', { status: 201 });
  } catch (error) {
    return new Response('Error creating capsule'+error, { status: 400 });
  }
}
