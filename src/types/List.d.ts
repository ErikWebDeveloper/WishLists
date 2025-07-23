interface List {
  id: string;
  name: string;
  description?: string;
  items: number;
  createdAt: Date;
  is_public: boolean;
}

type Lists = Array<List>;
