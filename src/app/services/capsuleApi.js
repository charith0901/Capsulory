export async function getAllCapsules(user) {
    console.log(user);
    const res = await fetch(`/api/Capsules?userId=${user.id}`);
    return res.json();
  }
  