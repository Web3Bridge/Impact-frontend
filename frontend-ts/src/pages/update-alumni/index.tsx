import useUser from '@/lib/useUser';
import React, { useEffect, useRef, useState } from 'react';
import w3bLogo from '@/assets/Images/Logo.png';
import Image from 'next/image';
import { BiCamera } from 'react-icons/bi';
import toast from 'react-hot-toast';

const Alumni = () => {
  const { user, refetchUser, postApi } = useUser({
    redirectTo: '/update-alumni/login',
    access: 'Alumni',
  });
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    dob: '',
    address: '',
    city: '',
    state: '',
    phonenumber: '',
    gender: '',
    about: '',
    socialLinks: {
      twitter: '',
      linkedin: '',
      github: '',
      portfolio: '',
    },
    openToWork: 'no',
    image: '',
  });
  const [termsChecked, setTermsChecked] = useState(false);
  const [img, setImg] = useState<File>();

  useEffect(() => {
    if (!user) return;
    refetchUser()
      .then((data) =>
        setUserData({
          ...userData,
          firstname: data.firstname ?? '',
          lastname: data.lastname! ?? '',
          dob: data.dob! ?? '',
          address: data.address! ?? '',
          city: data.city! ?? '',
          state: data.state! ?? '',
          phonenumber: data.phonenumber! ?? '',
          gender: data.gender! ?? 'male',
          about: data.about! ?? '',
          socialLinks: {
            twitter: data.socialLinks?.twitter! ?? '',
            linkedin: data.socialLinks?.linkedin! ?? '',
            github: data.socialLinks?.github! ?? '',
            portfolio: data.socialLinks?.portfolio! ?? '',
          },
        })
      )
      .catch((err) => {
        console.error(err);
        toast.error('Error Loading User');
      });
  }, []);

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', img!, '[PROXY]');

      const res = await postApi(`user/${user.id}/upload`, formData, true);
      console.log(res);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  const handleUpdate = async () => {
    try {
      const res = await postApi(`user/${user.id}`, userData);
      if (res.status) {
        toast.success('Data updated successfully');
      } else {
        toast.error(`Error updating data: ${res.message}`);
      }
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="p-8 border-b-w3b-red border-b relative">
        <Image alt={'Web3Bridge Logo'} src={w3bLogo} className="" />
      </div>

      <div className="border-w3b-black/10 border rounded-2xl max-w-7xl mx-4 my-16 xl:mx-auto p-4 grid gap-6">
        <div className="text-center">
          <p className="font-bold text-xl">Update Data</p>
        </div>

        <div className="flex gap-8 items-end">
          <div className="w-52 h-52 rounded-full grid place-content-center overflow-hidden border border-w3b-red relative">
            <label htmlFor="file">
              <Image
                alt="user image"
                src={img ? URL.createObjectURL(img!) : ''}
                width={208}
                height={208}
                className="rounded-full"
              />
              <div className=" absolute top-0 left-0 w-52 h-52 grid place-content-center bg-black/60 opacity-0 hover:opacity-100 text-w3b-red transition-all duration-300">
                <BiCamera size={40} />
              </div>
            </label>
            <input
              type="file"
              name="file"
              id="file"
              value={''}
              onChange={(e) => {
                if (!e.target.files) return;
                setImg(e.target.files![0]);
              }}
              className="hidden"
            />
          </div>

          <button
            className="border border-w3b-red rounded-md hover:bg-w3b-light-red  disabled:opacity-20 py-1 px-2"
            disabled={!img}
            onClick={handleUpload}
          >
            Upload now
          </button>
        </div>
        <div className="form-group">
          <div className="form-item">
            <label htmlFor="firstname">First name </label>
            <input
              className="input"
              type="text"
              name="firstname"
              id="firstname"
              value={userData.firstname}
              onChange={(e) => setUserData({ ...userData, firstname: e.target.value })}
              placeholder="Your first name"
            />
          </div>

          <div className="form-item">
            <label htmlFor="lastname">Last name </label>
            <input
              className="input"
              type="text"
              name="lastname"
              id="lastname"
              value={userData.lastname}
              onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
              placeholder="Your last name"
            />
          </div>
        </div>

        <div className="form-group">
          <div className="form-item">
            <label htmlFor="gender">Gender </label>
            <select
              name="gender"
              id="gender"
              className="input"
              value={userData.gender}
              onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="prefer not to say">Prefer not to say</option>
            </select>
          </div>
          <div className="form-item">
            <label htmlFor="dob">Date of Birth </label>
            <input
              className="input"
              type="date"
              name="dob"
              id="dob"
              value={userData.dob}
              onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
            />
          </div>

          <div className="form-item">
            <label htmlFor="phonenumber">Phone number </label>
            <input
              className="input"
              type="text"
              name="phonenumber"
              id="phonenumber"
              value={userData.phonenumber}
              onChange={(e) => setUserData({ ...userData, phonenumber: e.target.value })}
              placeholder="234812345678"
            />
          </div>
        </div>

        <div className="form-group">
          <div className="form-item min-w-full md:min-w-[600px] ">
            <label htmlFor="address">Address </label>
            <input
              className="input"
              type="text"
              name="address"
              id="address"
              value={userData.address}
              onChange={(e) => setUserData({ ...userData, address: e.target.value })}
              placeholder="123 Main Street"
            />
          </div>

          <div className="form-item">
            <label htmlFor="city">City </label>
            <input
              className="input"
              type="text"
              name="city"
              id="city"
              value={userData.city}
              onChange={(e) => setUserData({ ...userData, city: e.target.value })}
              placeholder="New York"
            />
          </div>

          <div className="form-item">
            <label htmlFor="state">State </label>
            <input
              className="input"
              type="text"
              name="state"
              id="state"
              value={userData.state}
              onChange={(e) => setUserData({ ...userData, state: e.target.value })}
              placeholder="NY"
            />
          </div>
        </div>

        <div className="form-group">
          <div className="form-item">
            <label htmlFor="about">Short Bio </label>
            <textarea
              className="input min-h-[200px]"
              name="about"
              id="about"
              value={userData.about}
              onChange={(e) => setUserData({ ...userData, about: e.target.value })}
              placeholder="Tell us about yourself"
            />
          </div>
        </div>

        <div className="form-group">
          <p className="w-full -my-2">Social Links</p>

          <div className="form-item">
            <label htmlFor="github">Github </label>
            <input
              className="input"
              type="text"
              name="github"
              id="github"
              value={userData.socialLinks.github}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  socialLinks: { ...userData.socialLinks, github: e.target.value },
                })
              }
              placeholder="https://github.com"
            />
          </div>

          <div className="form-item">
            <label htmlFor="twitter">Twitter </label>
            <input
              className="input"
              type="text"
              name="twitter"
              id="twitter"
              value={userData.socialLinks.twitter}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  socialLinks: { ...userData.socialLinks, twitter: e.target.value },
                })
              }
              placeholder="https://twitter.com"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-item">
            <label htmlFor="linkedin">Linkedin </label>
            <input
              className="input"
              type="text"
              name="linkedin"
              id="linkedin"
              value={userData.socialLinks.linkedin}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  socialLinks: { ...userData.socialLinks, linkedin: e.target.value },
                })
              }
              placeholder="https://linkedin.com"
            />
          </div>

          <div className="form-item">
            <label htmlFor="portfolio">Portfolio </label>
            <input
              className="input"
              type="text"
              name="portfolio"
              id="portfolio"
              value={userData.socialLinks.portfolio}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  socialLinks: { ...userData.socialLinks, portfolio: e.target.value },
                })
              }
              placeholder="https://portfolio.com"
            />
          </div>
        </div>

        <div className="form-group">
          <div className="form-item">
            <label htmlFor="openToWork">Are you open to work?</label>
            <select
              name="openToWork"
              id="openToWork"
              className="input"
              value={userData.openToWork}
              onChange={(e) => setUserData({ ...userData, openToWork: e.target.value })}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={termsChecked}
              onChange={(e) => setTermsChecked(e.target.checked)}
            />
            <label htmlFor="terms">
              I agree that this information is correct and belongs to me
            </label>
          </div>
        </div>

        <button
          className="bg-w3b-red text-white rounded-lg py-2 px-8 hover:bg-[#7a1515] disabled:bg-w3b-light-red"
          disabled={!termsChecked}
          onClick={handleUpdate}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

//   "dob": "1990-05-15",
//   "address": "123 Main Street",
//   "city": "New York",
//   "state": "NY",

export default Alumni;