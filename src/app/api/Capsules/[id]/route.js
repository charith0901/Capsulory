import connectDB from '../../../../lib/mongodb';
import Capsule from '../../../../model/Capsule';

export async function GET(request, { params }) {
    try {
        await connectDB();
        const id = params.id;
        const capsule = await Capsule.findById(id);
        
        if (!capsule) {
            return new Response(JSON.stringify({ message: "Capsule not found" }), { 
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        return new Response(JSON.stringify(capsule), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}