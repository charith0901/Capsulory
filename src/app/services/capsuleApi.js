export async function getAllCapsules(user) {
    try {
        console.log(user);
        const res = await fetch(`/api/Capsules?email=${user.email}`);
        if (!res.ok) {
            throw new Error('Failed to fetch capsules');
        }
        return res.json();
    } catch (error) {
        console.error('Error fetching capsules:', error);
        throw error;
    }
}

export async function getById(id) {
    try {
        const res = await fetch(`/api/Capsules/${id}`);
        if (!res.ok) {
            throw new Error('Failed to fetch capsule by ID');
        }
        return res.json();
    } catch (error) {
        console.error('Error fetching capsule by ID:', error);
        throw error;
    }
}

export async function deleteCapsule(id) {
    try {
        const res = await fetch(`/api/Capsules?id=${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) {
            throw new Error('Failed to delete capsule');
        }
        return res;
    } catch (error) {
        console.error('Error deleting capsule:', error);
        throw error;
    }
}
