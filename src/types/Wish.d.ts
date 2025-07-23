type Wish = {
  id: string;
  listId: string;
  name: string;
  url?: string;
  description?: string;
  price?: number;
  hope: number;
};

type Wishes = Array<Wish>;
