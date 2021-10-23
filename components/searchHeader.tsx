import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';
import { Paper } from '@mui/material';

const SearchHeader: React.FC = () => {
  const router = useRouter();
  const [region, setRegion] = useState<string>('na');
  const [searchTerm, setSearchTerm] = useState<string>();

  const handleRegionChange = (event: SelectChangeEvent) => {
    setRegion(event.target.value);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchTerm(event.target.value ?? undefined);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/summoner/${searchTerm}`);
  };

  const regionSelections = [
    { value: 'na', text: 'NA' },
    { value: 'euw', text: 'EUW' }
  ];

  return (
    <div className='flex items-center bg-flickr'>
      <div className='flex items-center ml-4'>
        <IconButton size='large' edge='start' color='inherit' aria-label='open drawer'>
          <MenuIcon />
        </IconButton>
        <div className='text-lg mr-4'>
          LoLPA
        </div>
      </div>
      <div className='absolute w-screen flex justify-center'>
        <form className='flex rounded-md bg-white bg-opacity-10 hover:bg-opacity-25' onSubmit={handleSubmit}>
          <InputBase id='search' className='ml-3' placeholder='Search...' type="search" onChange={handleSearchChange} />
          <button type="submit" />
          <Divider orientation='vertical' variant='middle' flexItem />
          <Select id='region' variant='standard' disableUnderline className='ml-2' value={region} onChange={handleRegionChange} >
            {regionSelections.map(r => <MenuItem key={r.value} value={r.value}>{r.text}</MenuItem>)}
          </Select>
        </form>
      </div>
    </div>
  );
}

export default SearchHeader;
