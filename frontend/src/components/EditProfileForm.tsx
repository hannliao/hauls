import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { User } from "../types/user";
import { editUser } from "../api/user";

interface FormData {
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  bio: string;
}

const EditProfileForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    bio: '',
  });
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("No user context");
  }
  const { user, loading, setUser } = context;

  useEffect(() => {
    console.log("useEffect triggered, user:", user, "loading:", loading);
    if (!loading && !user) {
      navigate('/login');
    }
    if (user && user.firstName) {
      console.log('user data received:', user);
      setFormData((prevFormData) => ({
        ...prevFormData,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        city: user.city || '',
        state: user.state || '',
        bio: user.bio || '',
      }));
      console.log('formData updated:', formData);
    }
  }, [user, loading, navigate])

  if (loading) {
    return <div className="flex-1 flex justify-center items-center text-2xl">Loading...</div>
  }

  if (!user) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (!user) {
        console.error('User is not logged in.');
        navigate('/login');
        return;
      }
      const updatedUser: User = {...user, ...formData};
      const response = await editUser(updatedUser);
      if (response) {
        setUser(response.user);
        setSuccessMsg('Saved successfully!');
        setTimeout(() => {
          setSuccessMsg(null);
        }, 2000);
      } else {
        console.error('Failed to update user profile.');
      }
    } catch (err) {
      console.error('Error editing user profile:', err);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({...prevData, [name]: value }));
  }

  return (
    <div className="flex flex-col items-center">
      {successMsg && (
        <div className="animate-fade-out absolute bg-green-200 text-green-800 p-3 px-6 rounded top-20">{successMsg}</div>
      )}
      <div className="w-full flex justify-start mb-4">
        <Link to={`/${user!.username}`} className="flex space-x-2 p-2 px-4 rounded-lg hover:bg-stone-200">
          <img src="/icons/arrow-left.svg" alt="back" className="w-5" />
          <p className="font-medium text-lg">Back</p>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-10 px-16 max-w-xl mx-auto flex flex-col items-center">
        <h2 className="font-semibold text-xl text-center mb-8">Edit Profile</h2>
        <div className="w-full flex space-x-6">
          <div className="flex-grow flex flex-col mb-4">
            <label htmlFor="firstName">First Name*</label>
            <input
              className="border border-stone-300 rounded-lg p-2"
              id="firstName"
              name="firstName"
              type="text"
              maxLength={50}
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex-grow flex flex-col">
            <label htmlFor="lastName">Last Name*</label>
            <input
              className="w-full border border-stone-300 rounded-lg p-2"
              id="lastName"
              name="lastName"
              type="text"
              maxLength={50}
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
          
        <div className="w-full flex space-x-6">
          <div className="flex-grow flex flex-col mb-4">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className="w-full border border-stone-300 rounded-lg p-2"
              name="city"
              placeholder="Denver"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="flex-grow flex flex-col">
            <label htmlFor="state">State</label>
            <input
              type="text"
              className="w-full border border-stone-300 rounded-lg p-2"
              name="state"
              placeholder="CO"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="bio">Bio</label>
          <textarea
            className="border border-stone-300 w-full rounded-lg p-2 mb-2"
            name="bio"
            id="bio"
            cols={30}
            rows={7}
            placeholder="How often do you go to the grocery store? What are your essentials? What's your favorite treat?"
            value={formData.bio}
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-lime-700 hover:bg-lime-600 rounded-full p-3 mt-5 text-white font-semibold"
        >
          Save Changes
        </button>
      </form>    
    </div>
  )
}

export default EditProfileForm;