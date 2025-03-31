import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router'
import { UserContext } from '../contexts/UserContext';
import { User } from '../types/user';
import { getUserByUsername } from '../api/user';
import { HaulContext } from '../contexts/HaulContext';
import HaulCard from './HaulCard';
import { deleteHaul } from '../api/hauls';
import DeleteHaulModal from './DeleteHaulModal';

const Profile = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("No user context");
  }
  const { user: loggedInUser } = context;
  
  const { username } = useParams<{ username: string }>();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [modalState, setModalState] = useState({
    isVisible: false,
    haulId: null as string | null
  })

  const { hauls, setHauls, pagination, changePage } = useContext(HaulContext);

  const userHauls = hauls.filter((haul) => haul.username === username);

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
    <div className="w-full max-w-4xl flex flex-col items-center">
      <div className="relative bg-white rounded-lg w-full max-h-fit p-8 m-10 flex flex-col justify-start items-center text-center">
          <h2 className="font-bold text-3xl">{profileUser.firstName} {profileUser.lastName}</h2>
          <h3 className="text-lg text-cyan-600">@{profileUser.username}</h3>
          {profileUser.bio && (
            <p className="max-w-xl my-2 whitespace-pre-line">{profileUser.bio}</p>
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
      <h2 className="place-self-start font-semibold text-xl mb-8">Recent Hauls</h2>
      <div className="w-full max-w-4xl flex flex-col items-center">
        {userHauls.length > 0 ? (
          userHauls.map((haul) => 
            <div key={haul.id} className="w-full flex items-center group">
              <HaulCard haul={haul} />
              {isOwnProfile &&
                <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Link to={`${haul.slug}/edit`} className="w-10 p-2 m-2 rounded-lg hover:bg-stone-200">
                    <img src="/icons/edit.svg" alt="edit" />
                  </Link>
                  <Link to='/' className="w-10 p-2 m-2 rounded-lg hover:bg-stone-200">
                    <img src="/icons/trash.svg" alt="delete" />
                  </Link>
                </div>
              }
            </div>
          )
        ) : (
          <p>No hauls found.</p>
        )}
      </div>

      {modalState.isVisible && (
        <DeleteHaulModal
          onCancel={() => toggleModal()}
          onDelete={handleDelete}
          isModalVisible={modalState.isVisible}
        />
      )}
    </div>
  )
}

export default Profile;