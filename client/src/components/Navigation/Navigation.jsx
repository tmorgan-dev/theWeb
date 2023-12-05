export default function Navigation({ links }) {
    return (
        <ul className='flex items-center space-x-4'>
            {links.map((link, index) => (
                <li key={index} className='text-white'>{link}</li>
            ))}
        </ul>
    );
}