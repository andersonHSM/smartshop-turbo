export default function ProductCard({ product }: { product: any }) {
    return (
        <div
            style={{
                border: '1px solid #ccc',
                padding: '1rem',
                marginBottom: '1rem',
                borderRadius: '8px',
            }}
        >
            <h3>{product.name}</h3>
            <p>{product.description}</p>
        </div>
    );
}
