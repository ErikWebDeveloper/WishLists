const mockLists: List[] = Array.from({ length: 20 }, (_, i) => ({
  id: `list-${i + 1}`,
  name: `Lista ${i + 1}`,
  is_public: i % 1 === 0 ? true : false,
  description: i % 2 === 0 ? `Descripción de la lista ${i + 1}` : undefined,
  items: Math.floor(Math.random() * 50) + 1,
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
}));

export default mockLists;
