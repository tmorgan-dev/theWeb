export default function Navigation({ links }) {
    return (
        // Tailwind to create basic navbar, additional css elements for design will be in Header
        <ul className='flex items-center space-x-4'>
            {links.map((link, index) => (
                <li key={index} className='text-white'>{link}</li>
            ))}
        </ul>
    );
}