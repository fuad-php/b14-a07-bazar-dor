"use client"
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { MdOutlineSubdirectoryArrowLeft } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';

const UserInfo = () => {
    const {data:userSession} = authClient.useSession();
    const user = userSession?.user
    const handleSignOut = async () => {
        await authClient.signOut();
    }

    return (
        
        <div className="flex shrink-0 items-center gap-2">
            {
                user ? (
                    <div className=''>                                            
                        <div className="dropdown dropdown-hover">
                            <div tabIndex={0} role="button" className="m-2 flex items-center gap-4 font-bold">
                                <div className="avatar flex gap-2 items-center">
                                    <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-3 ring-offset-2">
                                        {user.image ? 
                                        <Image width={30} height={30} alt="Tailwind-CSS-Avatar-component" src={user.image} />
                                    :
                                        <RxAvatar className='text-4xl text-center' />
                                        }
                                    </div>
                                </div>
                                <p>{user.name}</p>
                            </div>
                            <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-60 p-3 shadow-md">
                                <li><p className='font-bold text-lg p-2'>{user.name}</p></li>
                                <li><p className='text-sm mb-4'>{user.email}</p></li>
                                <li><Link href={"/profile"} className='mx-3 p-2'><FaUser/> আমার প্রোফাইল</Link></li>                                
                                <li><button className='btn btn-error btn-xs rounded font-bold my-4' onClick={handleSignOut}><MdOutlineSubdirectoryArrowLeft /> সাইন আউট</button></li>

                            </ul>
                            </div>
                    </div>
                ) : (
                <div className="flex shrink-0 items-center gap-2">
                    <Link href="/signin" >
                    <button className="btn btn-sm border-base-300 bg-base-100 text-base-content hover:border-primary hover:bg-primary/5 sm:btn-md">
                        সাইন ইন
                    </button>
                    </Link>

                    <Link
                    href="/signup" >
                    <button className="btn border-base-300 btn-sm btn-primary sm:btn-md brand-button">
                    সাইন আপ
                    </button>
                    </Link>
                </div> 
                ) 
            }
            
        </div>
    );
};

export default UserInfo;