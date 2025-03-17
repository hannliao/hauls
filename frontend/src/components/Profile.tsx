import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router'
import { UserContext } from '../contexts/UserContext';
import { User } from '../types/user';
import { getUserByUsername } from '../api/user';

const Profile = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("No user context");
  }
  const { user: loggedInUser } = context;
  
  const { username } = useParams<{ username: string }>();
  const [profileUser, setProfileUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfileUser = async () => {
      try {
        if (username) {
          const fetchedUser = await getUserByUsername(username);
          setProfileUser(fetchedUser.user)
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
      }
    };
    fetchProfileUser();
  }, [username]);

  if (!profileUser) {
    return <div className="flex-1 flex justify-center items-center text-2xl">Loading...</div>
  }

  const isOwnProfile = loggedInUser?.username == profileUser.username;

  return (
    <div>
      <div className="relative bg-white rounded-lg max-h-fit p-8 m-10 flex flex-col justify-start items-center text-center">
          <h2 className="font-bold text-3xl">{profileUser.firstName} {profileUser.lastName}</h2>
          <h3 className="text-lg text-lime-700">@{profileUser.username}</h3>
          {profileUser.bio && (
            <p className="max-w-xl my-2">{profileUser.bio}</p>
          )}
          {profileUser.city && profileUser.state && (
            <div className="flex space-x-1 justify-center items-center">
              <img src="/icons/location-outline.svg" alt="location" className="w-5" />
              <p>{profileUser.city}, {profileUser.state}</p>
            </div>
          )}

          {isOwnProfile && (
            <div className="absolute top-6 right-6">
              <Link to="edit">
                <img src="/icons/edit.svg" alt="edit" className="w-10 p-2 rounded-lg hover:bg-stone-100" />
              </Link>
            </div>
          )}
      </div>
      <h2 className="font-semibold text-xl mb-8">Recent Hauls</h2>
      <div className="flex flex-col items-center">
        haul cards go here
      </div>
    </div>
  )
}

export default Profile;