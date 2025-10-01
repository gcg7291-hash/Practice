export default function Recipe({ recipes }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border">
      <img
        className="w-full h-48 object-cover rounded-lg mb-4"
        src={recipes["image"]}
        alt="레시피 이미지"
      />
      <h3 className="text-lg font-bold text-gray-800 mb-2">
        {recipes["name"]}
      </h3>
      <p className="text-gray-600 mb-2">{recipes["cookTimeMinutes"]}</p>
      <p className="text-gray-600 mb-2">{recipes["difficulty"]}</p>
      <p className="text-gray-600">{recipes["caloriesPerSeving"]}</p>
    </div>
  );
}
