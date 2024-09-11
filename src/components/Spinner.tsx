export default function Spinner() {
    return (
        <div className='flex space-x-1 justify-center items-center  dark:invert'>
            <span className='sr-only'>Loading...</span>
            <div className='h-1 w-1 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-1 w-1 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-1 w-1 bg-black rounded-full animate-bounce'></div>
        </div>

    );
}
