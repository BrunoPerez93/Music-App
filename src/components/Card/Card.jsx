import cover from '../../assets/cover-1.png';

const Card = () => {

  return (
   <div className='bg-c-dark p-10 rounded-[25px]'>
    <div className='text-center'>
      <img className='rounded-[25px] mb-5' src={cover} alt='cover de musica' />
      <h1 className='text-3xl text-c-white'>Lost in the City Lights</h1>
    </div>
   </div>
  )
}

export default Card;