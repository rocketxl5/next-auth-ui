type FooterProps = {
    minimal?: boolean
}

export function Footer({minimal= false}: FooterProps) {
    if(minimal) return null;

    return (
        <footer className="border-t p-4 text-sm opacity-70">
        <p className="text-center">© {new Date().getFullYear()} Super Next App</p>
        </footer>
    )
}