import useTrailers from "../hooks/useTrailers";

interface Props {
  productId: number;
}

const ProductTrailor = ({ productId }: Props) => {
  const { data, error, isLoading } = useTrailers(productId);
  if (isLoading) return null;
  if (error) throw error;

  const first = data?.results[0];
  return first ? (
    <video
      src={first.data[480]}
      poster={first.preview}
      controls
      style={{ marginBottom: "15px" }}
    />
  ) : null;
};

export default ProductTrailor;
