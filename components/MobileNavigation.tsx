"use client";

import React, { useState } from 'react'

import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import { Separator } from './ui/separator';
import Link from 'next/link';
import { navItems } from '@/constants';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
// import FileUploader from './FileUploader';
// import { signOutUser } from '@/lib/actions/user.actions';

interface Props {
    $id: string;
    accountId: string;
    fullName: string;
    avatar: string;
    email: string;
}

const MobileNavigation = ({$id: ownerId, accountId, fullName, avatar, email} : Props) => {

    const[open, setOpen] = useState(false);

    const pathname = usePathname();

  return <header className='mobile-header bg-white'>
    <Image src= '/assets/icons/logo-full-brand.svg' alt='Logo' width={120} height={52} className='h-auto'/>
    <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
            <Image src='/assets/icons/menu.svg' alt='Search' width={30} height={30}  />
        </SheetTrigger>
        <SheetContent className='bg-white fixed inset-y-0 right-0 h-full w-[80%] border-l shadow-lg px-3 py-4 overflow-y-auto'>
            <SheetTitle>
                <div className='header-user'>
                    <Image src={avatar} alt='avatar' width={44} height={44} className='header-user-avatar'></Image>
                    <div className='sm:hidden ld:block'>
                        <p className='subtitle-2 capitalize'>{fullName}</p>
                        <p className='caption'>{email}</p>
                    </div>
                </div>
                <Separator className='mb-4 bg-light-200/20' />
            </SheetTitle>
            <nav className='mobile-nav'>
                <ul className='mobile-nav-list'>
                    {navItems.map(({ url, name, icon }) => (
                    <Link href={url} key={name} className='lg:w-full'>
                        <li key={url} className={cn("mobile-nav-item", pathname === url && 'shad-active')}>
                            <Image src={icon} alt={name} width={24} height={24} className={cn('nav-icon', pathname === url && 'nav-icon-active')}/>
                            <p>{name}</p>
                        </li>
                    </Link>
            ))}
                </ul>
            </nav>

            <Separator className='my-5 bg-light-200/20' />

            <div className='flex flex-col justify-between gap-5 pb-5'>
                {/* <FileUploader ownerId={ownerId} accountId={accountId} /> */}
                {/* <Button type='submit' className='mobile-sign-out-button' onClick={async() => await signOutUser()}>
                    <Image src='/assets/icons/logout.svg' alt='Logout' width={24} height={24} />
                    <p>Logout</p>
                </Button> */}
            </div>
        </SheetContent>
    </Sheet>

  </header>
}

export default MobileNavigation