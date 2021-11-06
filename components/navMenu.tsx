import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

interface NavMenuProps {
  toggleMenu: () => void
}

const NavMenu: React.FC<NavMenuProps> = ({ toggleMenu }: NavMenuProps) => {
  return (
    <section className='text-on-background-default'>
      <header className='flex bg-foreground-default p-4'>
        <h1 className='text-attention-primary-default text-3xl'>LoLPA</h1>
        <span className=' text-on-background-default bg-on-background-muted ml-3 rounded-full'>
          <IconButton color='inherit' onClick={toggleMenu}>
            <CloseIcon color='inherit' />
          </IconButton>
        </span>
      </header>
      <hr className='' />
    </section >
  );
};

export default NavMenu;