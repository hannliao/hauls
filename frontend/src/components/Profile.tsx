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
  const [error, setError] = useState<String>('');

  const { hauls, setHauls, pagination, changePage } = useContext(HaulContext);

  const userHauls = hauls.filter((haul) => haul.username === username);

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
      setHauls(hauls.filter((h) => h.id !== haulId));
      setModalState({
        isVisible: false,
        haulId: null
      })
    } catch (error) {
      console.error('Failed to delete haul:', error);
    }
  }

  const pageNumbers = [];
  for (let i = 1; i <= pagination.pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="w-full max-w-4xl flex flex-col items-center">
      <div className="relative bg-white rounded-lg w-full max-h-fit p-8 m-10 flex flex-col justify-start items-center text-center">
          <h2 className="font-bold text-3xl">{profileUser.firstName} {profileUser.lastName}</h2>
          <h3 className="text-lg text-blue-500">@{profileUser.username}</h3>
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

            {/* pagination controls */}
            <div className="flex justify-center my-10">
              <nav className="flex items-center">
                <button
                  onClick={() => changePage(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className={`px-3 py-1 mx-2 rounded bg-stone-200 ${
                    pagination.page === 1
                      ? 'cursor-not-allowed'
                      : 'hover:bg-stone-300'
                  }`}
                >
                  prev
                </button>

                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => changePage(number)}
                    className={`px-3 py-1 mx-1 rounded ${
                      pagination.page === number
                        ? 'bg-amber-500 text-white'
                        : 'bg-amber-100 hover:bg-amber-200'
                    }`}
                  >
                    {number}
                  </button>
                ))}

                <button
                  onClick={() => changePage(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className={`px-3 py-1 mx-2 rounded bg-stone-200 ${
                    pagination.page === pagination.pages
                      ? 'cursor-not-allowed'
                      : 'hover:bg-stone-300'
                  }`}
                >
                  next
                </button>
              </nav>
            </div>
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