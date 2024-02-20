# RejuvenateAI x Avalanche hack 

Live Demo - [Youtube video](https://youtu.be/u9oClURPhUY) <br />
Live Link - [RejuvenateAI dapp](https://rejuvenate-ai-chainlink.vercel.app/) <br />

## ✨ Description

[RejuvenateAI]() is the first community blockchain based project powered by community built for community to promote healthy living and achieve  healthy locations where people live up to a 100 years all around the world. We are trying to make sure people live healthy by incorporating healthy habits into their lifestyle and trying to make sure they get the most out of the human experience by discovering their purpose if they haven't already and enjoying this life, all while doing it together as a community being accountable to each other.

## Inspiration

People are becoming obsessed with living longer, but they don't know how, they are spending so much money on drugs and supplements, but are they really doing it correctly? We don't think so, so that's why we at RejuvenateAI have come up with this idea to focus on nutrition and fitness. What if we can create communities that are focused on living up to 100 years. 

## What we built

Our features empower personal healthy living habits by:

- Allowing users to setup meetings with nutritionists who would offer professional consultation to them.
- Providing educative articles that can inspire users to live healthier lives. 
- Providing educative meal and fitness plans that paid subscribers have access to.
- Users can interact with each other in our communities and work on health goals/challenges together.
- Users can set up in real life events in communities and meet up and do healthy activities together like long walks, marathons etc.

## 💻 How we built RejuvenateAI

Here's a breakdown of how it was built:


1. Users can sign up with the ```register``` function, which they will pay the subscription fee and then get onboarded into our platform to enjoy our services

2. Nutritionists can sign up with the ```applyForNutritionistRole``` function, which they will pass their credentials into and have their application status set to pending.

3. We will then see their application status, and after verifying their credentials and see that it's legitimate we can now approve their status by calling the ```approveNutritionistRole``` function, which will approve the nutritionists and set their application status as accepted, and they can now be onboarded into our platform.

4. Now these nutritionists can now create meal plans by calling ``createMealPlans`` which will create meal plans for users to access.

5. When a user's subscription expires, their subscription status automatically expires and their access to our platform gets revoked and their user NFT gets burned automatically, this functionality is enabled by chainlink automation which calls the ``revokeUser`` function when their deadline elapses, they still remain members of our platform just that they can't access our services until they renew their subscription and they can now mint another user NFT

6. Users can join communities and chat in these communities, the chat feature is powered by push protocol, there are also ongoing challenges and events going on in communities.


## Where we deployed to/contract details

We created and deployed our smart contracts on the Avalanche fuji testnet chain. 

### Avalanche Testnet

1. CommunityNetwork contract 0x48DF3348bb3810c4eec755152fA3a9c68897f0F2 - [View source code](https://github.com/degencodebeast/RejuvenateAI-Avalanche/blob/main/smart-contracts/contracts/CommunityNetwork.sol) | [View on Avalanche](https://testnet.snowtrace.io/address/0x48DF3348bb3810c4eec755152fA3a9c68897f0F2)

2. Treasury contract 0x3168Be8281fa2D097d3DB9119143b0937e529a87 - [View source code](https://github.com/degencodebeast/RejuvenateAI-Avalanche/blob/main/smart-contracts/contracts/Treasury.sol) | [View on Avalanche](https://testnet.snowtrace.io/address/0x3168Be8281fa2D097d3DB9119143b0937e529a87)

3. User NFT contract 0xC862942EF3bb3D185F8154487A6af9ca9F5FB775 - [View source code](https://github.com/degencodebeast/RejuvenateAI-Avalanche/blob/main/smart-contracts/contracts/UserNFT.sol) | [View on Avalanche](https://testnet.snowtrace.io/address/0xC862942EF3bb3D185F8154487A6af9ca9F5FB775)

4. Nutritionist NFT contract 0x0Ac68437476A0aB3aC8e3fB03b01B030B4Ec5413 - [View source code](https://github.com/degencodebeast/RejuvenateAI-Avalanche/blob/main/smart-contracts/contracts/NutritionistNFT.sol) | [View on Avalanche](https://testnet.snowtrace.io/address/0x0Ac68437476A0aB3aC8e3fB03b01B030B4Ec5413)


