'use client';
//eslint#disabling-rules
import { createContext, useContext, useState } from 'react';
import { Community, User, stateContextType } from '../types/state';
import { useAccount, useNetwork, useWalletClient, useEnsName } from 'wagmi';
import { MealPlan } from '@/types/shared';
const defaultCommunities = [
  {
    name: 'All for good',
    id: '1',
    slug: 'all-for-good-erd4',
    membersCount: 20,
    members: [{}],
    cover: '',
    description:
      'Join a movement that goes beyond personal well-being. In the "All for Good" nutrition community, we believe in the power of nutrition to create positive change. Share your journey towards a healthier you, engage in impactful discussions about sustainable eating, and explore how good nutrition can contribute to a better world. Every meal counts, and together, we\'re making choices that are "All for Good."',
  },
  {
    name: 'Live life to fullness',
    id: '2',
    slug: 'live-life-to-fullness-fed3',
    membersCount: 10,
    members: [{}],
    cover: '',
    description:
      'Experience a community that encourages you to savor every bite and live life to the fullest through mindful nutrition. In "Live Life to Fullness," we embrace a holistic approach to well-being, celebrating the pleasures of nourishing both body and soul. Discover a wealth of resources, connect with fellow members on a journey to vitality, and learn how to make every aspect of your life more fulfilling through balanced and joyful nutrition.',
  },
  {
    name: 'Meet your faves',
    id: '3',
    slug: 'meet-your-faves-acd2',
    membersCount: 45,
    members: [{}],
    cover: '',
    description:
      'Discover a vibrant community where nutrition enthusiasts unite to share their favorite recipes, wellness tips, and success stories. Connect with like-minded individuals, learn from nutrition experts, and celebrate the joy of nourishing your body. In "Meet Your Faves," we believe that building a supportive network is key to embracing a healthier lifestyle together.',
  },
];

const contextDefaultValue: stateContextType = {
  allTokensData: {},
  address: '',
  setAllTokenData: () => null,
  setAddress: () => null,
  loading: false,
  setLoading: () => null,
  isUserConnected: false,
  setIsUserConnected: () => null,
  user: {} as User,
  setUser: () => null,
  communities: defaultCommunities,
  community: null,
  setCommunities: () => null,
  setCommunity: () => null,
  mealPlans: [] as MealPlan[],

  setMealPlans: () => null,
  selectedMealPlan: {},
  setSelectedMealPlan: () => null,

  ensName: null,
  setEnsName: () => null,
  ensAvatar: null,
  setEnsAvatar: () => null,
};

type StateContextProviderProps = {
  children: React.ReactNode;
};

const AppContext = createContext<stateContextType>(contextDefaultValue);

export function AppWrapper({ children }: StateContextProviderProps) {
  const [allTokensData, setAllTokenData] = useState<any>({
    userNftUri: 'https://bafybeicxroigojtsvluxivtdkgmhcjijhnlvco2prg57ws6k3hqetkvhzu.ipfs.dweb.link/user%20badge.png',
    nutritionistNftUri: 'https://bafybeihbll3mj2l44kqy67gbxwnvui2zqfdphzr5mr53mxto77hgo4umka.ipfs.dweb.link/nutritionist%20badge.png',
  });
  const [address, setAddress] = useState<string>('');

  const [selectedMealPlan, setSelectedMealPlan] = useState<MealPlan | null>(
    null
  );
  const [community, setCommunity] = useState<Community | null>(null);
  const [communities, setCommunities] =
    useState<Community[]>(defaultCommunities);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>(sampleMealPlans);

  const [loading, setLoading] = useState<boolean>(false);
  const [isUserConnected, setIsUserConnected] = useState<boolean>(false);
  const [ensName, setEnsName] = useState<any>();
  const [ensAvatar, setEnsAvatar] = useState<any>();

  const [user, setUser] = useState<User>({
    userAddress: '',
    name: '',
    userCidData: '',
    startDate: '',
    endDate: '',
    amount: '',
  });
  const [nutritionist, setNutritionist] = useState('');

  let sharedState = {
    mealPlans,
    setMealPlans,
    allTokensData,
    setAllTokenData,
    address,
    setAddress,
    loading,
    setLoading,
    isUserConnected,
    setIsUserConnected,
    user,
    selectedMealPlan,
    setSelectedMealPlan,
    setUser,
    communities,
    community,
    setCommunities,
    setCommunity,
    ensName,
    setEnsName,
    ensAvatar,
    setEnsAvatar,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
export const sampleMealPlans: MealPlan[] = [
  {
    id: 1,
    time: 'Breakfast',
    slug: 'healthy-oatmeal-delight',
    authorId: 1,
    title: 'Healthy Oatmeal Delight',
    content: `
    # Healthy Oatmeal Delight
    
    ## Overview
    This nutritious breakfast option is packed with fiber and essential nutrients to kickstart your day.
    
    ## Ingredients
    - 1 cup rolled oats
    - 1/2 cup almond milk
    - 1 tablespoon chia seeds
    - 1/2 banana, sliced
    - Handful of fresh berries (strawberries, blueberries, or raspberries)
    
    ## Preparation
    1. In a bowl, combine rolled oats and almond milk.
    2. Add chia seeds and mix well.
    3. Let it sit in the refrigerator overnight.
    4. In the morning, top with banana slices and fresh berries.
    
    ## Nutritional Values
    - Calories: 300
    - Protein: 8g
    - Carbohydrates: 45g
    - Fiber: 10g
    - Healthy Fats: 5g
    
    ## Notes
    Feel free to customize with your favorite fruits and nuts.
    `,
    createdAt: new Date(),
    author: {
      id: 1,
      fullName: 'Vicky Debby',
      username: 'Vicky-Debbie',
      address: '0xabcdef0123456789012345678901234567890abc',
    },
  },
  {
    id: 2,
    time: 'Lunch',
    authorId: 1,
    slug: 'mediterranean-chickpea-salad',
    title: 'Mediterranean Chickpea Salad',
    content: `
    # Mediterranean Chickpea Salad
    
    ## Overview
    A refreshing and protein-packed salad inspired by Mediterranean flavors.
    
    ## Ingredients
    - 1 can chickpeas, drained and rinsed
    - 1 cup cherry tomatoes, halved
    - 1 cucumber, diced
    - 1/4 cup feta cheese, crumbled
    - 2 tablespoons olive oil
    - 1 tablespoon balsamic vinegar
    - Fresh basil leaves for garnish
    
    ## Preparation
    1. Combine chickpeas, cherry tomatoes, cucumber, and feta cheese in a bowl.
    2. In a small bowl, whisk together olive oil and balsamic vinegar.
    3. Pour the dressing over the salad and toss gently.
    4. Garnish with fresh basil leaves before serving.
    
    ## Nutritional Values
    - Calories: 350
    - Protein: 12g
    - Carbohydrates: 40g
    - Fat: 18g
    - Fiber: 10g
    
    ## Notes
    Perfect for a light and satisfying lunch.
    `,
    createdAt: new Date(),
    author: {
      id: 1,
      fullName: 'Vicky Debby',
      username: 'Vicky-Debbie',
      address: '0xabcdef0123456789012345678901234567890abc',
    },
  },
  {
    id: 3,
    time: 'Dinner',
    authorId: 1,
    slug: 'grilled-salmon-with-lemon-herb',
    title: 'Grilled Salmon with Lemon Herb Marinade',
    content: `
    # Grilled Salmon with Lemon Herb Marinade
    
    ## Overview
    A delicious and healthy dinner option featuring grilled salmon with a zesty lemon herb marinade.
    
    ## Ingredients
    - 2 salmon fillets
    - Zest and juice of 1 lemon
    - 2 tablespoons olive oil
    - 2 cloves garlic, minced
    - 1 teaspoon dried oregano
    - Salt and pepper to taste
    
    ## Preparation
    1. In a bowl, mix lemon zest, lemon juice, olive oil, minced garlic, oregano, salt, and pepper.
    2. Place salmon fillets in a dish and coat with the marinade. Let it marinate for at least 30 minutes.
    3. Preheat the grill and cook salmon for 4-5 minutes per side or until cooked through.
    
    ## Nutritional Values
    - Calories: 400
    - Protein: 30g
    - Fat: 25g
    - Carbohydrates: 2g
    - Omega-3 Fatty Acids: 1,500mg
    
    ## Notes
    Serve with a side of steamed vegetables for a complete meal.
    `,
    createdAt: new Date(),
    author: {
      id: 1,
      fullName: 'Vicky Debby',
      username: 'Vicky-Debbie',
      address: '0xabcdef0123456789012345678901234567890abc',
    },
  },
  {
    id: 4,
    time: 'Breakfast',
    slug: 'protein-packed-avocado-toast',
    authorId: 1,
    title: 'Protein-Packed Avocado Toast',
    content: `
    # Protein-Packed Avocado Toast
    
    ## Overview
    A quick and nutritious breakfast with the goodness of avocados and a protein boost.
    
    ## Ingredients
    - 2 slices whole-grain bread
    - 1 ripe avocado, mashed
    - 2 boiled eggs, sliced
    - Cherry tomatoes, sliced for garnish
    - Salt and pepper to taste
    - Optional: red pepper flakes for a spicy kick
    
    ## Preparation
    1. Toast the whole-grain bread slices until golden brown.
    2. Spread mashed avocado evenly on each slice.
    3. Arrange sliced boiled eggs on top.
    4. Season with salt, pepper, and red pepper flakes if desired.
    5. Garnish with cherry tomatoes.
    
    ## Nutritional Values
    - Calories: 320
    - Protein: 15g
    - Carbohydrates: 25g
    - Healthy Fats: 18g
    - Fiber: 8g
    
    ## Notes
    A satisfying breakfast that keeps you energized throughout the morning.
    `,
    createdAt: new Date(),
    author: {
      id: 1,
      fullName: 'Vicky Debby',
      username: 'Vicky-Debbie',
      address: '0xabcdef0123456789012345678901234567890abc',
    },
  },
];
