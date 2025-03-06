export async function getAllCapsules(user) {
    console.log(user);
    const res = await fetch(`/api/Capsules?email=${user.email}`);
    return res.json();
  }
export async function deleteCapsule(id) {
    const res = await fetch(`/api/Capsules?id=${id}`, {
      method: 'DELETE',
    });
    return res;
  }
  