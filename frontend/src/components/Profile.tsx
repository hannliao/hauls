import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router'
import { UserContext } from '../contexts/UserContext';
import { User } from '../types/user';
import { getUserByUsername } from '../api/user';
import HaulCard from './HaulCard';
import { deleteHaul } from '../api/hauls';
import DeleteHaulModal from './DeleteHaulModal';
import Pagination from './Pagination';
import useUserHauls from '../hooks/useUserHauls';

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
  const [error, setError] = useState<String>('');

  const {
    hauls: userHauls,
    setHauls: setUserHauls,
    pagination, 
    changePage
  } = useUserHauls(username);

  useEffect(() => {
    const fetchProfileUser = async () => {
      try {
        if (username) {
          const fetchedUser = await getUserByUsername(username);
          setProfileUser(fetchedUser.user);
          setError('');
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('User not found.')
      }
    };
    fetchProfileUser();
  }, [username]);

  if (error) {
    return <div className="place-self-center flex justify-center items-center text-xl">{error}</div>
  }

  if (!profileUser) {
    return <div className="place-self-center flex justify-center items-center text-xl">Loading...</div>
  }

  const isOwnProfile = loggedInUser?.username == profileUser.username;

  const toggleModal = (haulId: string | null = null) => {
    if (haulId) {
      setModalState({
        isVisible: true,
        haulId: haulId
      })
    } else { 
      setModalState({
        isVisible: false,
        haulId: null
      })
    }
  }
  const handleDelete = async () => {
    const {haulId} = modalState;
    if (!haulId) return;

    try {
      await deleteHaul(haulId);
      setUserHauls(userHauls.filter((h) => h.id !== haulId));
      setModalState({
        isVisible: false,
        haulId: null
      })
    } catch (error) {
      console.error('Failed to delete haul:', error);
    }
  }

  return (
    <div className="w-full max-w-4xl flex flex-col items-center">
      <div className="relative bg-white rounded-lg w-full max-h-fit p-8 m-10 flex flex-col justify-start items-center text-center">
          <h2 className="font-bold text-3xl">{profileUser.firstName} {profileUser.lastName}</h2>
          <h3 className="text-lg">@{profileUser.username}</h3>
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
          <>
            <div className="w-full">
              {userHauls.map((haul) => 
                <div key={haul.id} className="w-full flex items-center group">
                  <HaulCard
                    haul={haul}
                    showActions={isOwnProfile}
                    toggleModal={toggleModal}
                  />
                </div>
              )}
            </div>

            <Pagination pagination={pagination} changePage={changePage} />
          </>
          
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