import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';

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
    <div className='flex items-center bg-on-background-muted h-12'>
      <div className='flex items-center ml-4'>
        <div className='text-lg font-medium text-on-uncommon-default'>
          LoLPA
        </div>
      </div>
      <div className='absolute w-screen flex justify-center'>
        <form className='flex rounded-md bg-on-background-default' onSubmit={handleSubmit}>
          <InputBase id='search' className='ml-3' placeholder='Search...' type="search" onChange={handleSearchChange} />
          <button type="submit" />
          <Divider orientation='vertical' variant='middle' flexItem />
          <Select id='region' variant='standard' disableUnderline className='ml-2 text-on-background-muted' value={region} onChange={handleRegionChange} >
            {regionSelections.map(r => <MenuItem key={r.value} value={r.value}>{r.text}</MenuItem>)}
          </Select>
        </form>
      </div>
    </div>
  );
}

export default SearchHeader;
