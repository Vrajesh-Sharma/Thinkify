"use client";

import { navItems } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface Props {
    fullName: string;
    avatar: string;
    email: string;
}

const Sidebar = ({fullName, avatar, email} : Props) => {

    const pathname = usePathname();


  return <aside className='sidebar'>
    <Link href='/'>
        <Image src='/assets/logo-black.png' alt='Logo' width={250} height={70} className='hidden h-auto lg:block mt-[-100px]' />
        {/* <Image src='/assets/icons/logo-brand.svg' alt='Logo' width={52} height={52} className='lg:hidden ' /> */}
    </Link>
    <nav className='sidebar-nav'>
        <ul className='flex flex-1 flex-col gap-3'>
            {navItems.map(({ url, name, icon }) => (
                <Link href={url} key={name} className='lg:w-full'>
                    <li key={url} className={cn("sidebar-nav-item", pathname === url && 'shad-active')}>
                        {/* <Image src={icon} alt={name} width={24} height={24} className={cn('nav-icon', pathname === url && 'nav-icon-active')}/> */}
                        <p className='hidden lg:block'>{name}</p>
                    </li>
                </Link>
            ))}
        </ul>
    </nav>
    {/* <Image src='/assets/images/files-2.png' alt='logo' width={506} height={418} className='w-full hover:scale-105 transition-all duration-300'  /> */}

    <div className='sidebar-user-info'>
            <Image src={avatar} alt='avatar' width={44} height={44} className='sidebar-user-avatar' />
            <div className='hidden lg:block'>
                <p className='subtitle-2 capitalize'>{fullName}</p>
                <p className='caption'>{email}</p>
            </div>
    </div>
  </aside>
}

export default Sidebar