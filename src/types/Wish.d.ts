type Wish = {
  id: string;
  listId: string;
  name: string;
  url?: string;
  description?: string;
  price?: number;
  hope: number;
  image_url?: string;
};

type Wishes = Array<Wish>;
