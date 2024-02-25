import { Box, List, ListIcon, ListItem } from '@chakra-ui/react';
import Icon from '../Icon';
import { Link } from '@chakra-ui/next-js';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useAppContext } from '@/context/state';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function DashboardSideBar(props: {
  entryPath?: string;
  links: Array<{ title: string; url: string; icon: string; child?: string[] }>;
}) {
  const { user } = useAppContext();
  const router = useRouter();
  // useEffect(() => {
  //   // check if user is logged in
  //   if (!user || !Object.keys(user).length) {
  //     // Redirect the user to the home page
  //     router.push('/');
  //   }
  // }, [user]);

  const pathname = usePathname();

  const parts = pathname.split('/');
  const beforeLastPart = parts[parts.length - 2];
  const lastPart = parts[parts.length - 1];
  const _links = props.links.map((link, i) => {
    const isActive =
      lastPart === link?.url ||
      (beforeLastPart == link.url && link?.child?.includes(lastPart)) ||
      (link?.url === 'overview' && lastPart === 'dashboard');

    const buildLink = (entry: string, url: string) =>
      url.toLowerCase() === 'overview' ? entry + '' : entry + url;

    return (
      <ListItem
        key={'navlink' + i}
        fontSize={'18'}
        className={`py-3 pl-6 hover:bg-primaryYellowTrans hover:text-primaryBeige ${
          isActive
            ? ' hover:bg-primaryYellow text-primaryBeige bg-primaryYellowTrans'
            : 'text-secondaryGray'
        }`}
      >
        <Link
          textDecor={'none!important'}
          href={buildLink(props?.entryPath as string, link?.url)}
          alignItems={'center'}
          className='flex gap-[22px]'
        >
          <Icon name={link?.icon} size={24} />
          <span>{link?.title}</span>
        </Link>
      </ListItem>
    );
  });
  return (
    <Box className='h-full bg-primaryGray min-w-[220px] sticky top-0 ' pt={2}>
      <Link href='/'>
        <Image
          alt=''
          src='/images/svg/rejuvenate-logo-2.svg'
          width={200}
          height={70}
        />
      </Link>
      <List className='flex flex-col py-4 mt-[20px] mb-6 gap-4'>
        {[_links]}
      </List>
    </Box>
  );
}
