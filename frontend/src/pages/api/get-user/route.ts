import { NextRequest, NextResponse } from 'next/server'
import { init, fetchQuery } from "@airstack/airstack-react";

import { ethers } from "ethers";
//import { gql } from "graphql-request";
import { erc721ABI } from "wagmi";
import { polygon } from "wagmi/chains";


init(process.env.AIRSTACK_API_KEY || '')

export async function POST(req: NextRequest) {
  try {
    const { address } = await req.json()
    const query = `
      query GetAllSocials {
        Socials(
          input: {filter: {userAssociatedAddresses: {_eq: "${address}"}}, blockchain: ethereum}
        ) {
          Social {
            blockchain
            dappName
            profileName
            userAssociatedAddresses
            userId
            userCreatedAtBlockTimestamp
          }
        }
      }
    `
    const { data, error } = await fetchQuery(query)
    return NextResponse.json({ data, error})
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ error})
  }
}