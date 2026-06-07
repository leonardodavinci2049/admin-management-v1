export const GENERATE_SHORT_LINK_MUTATION = `
  mutation GenerateShortLink($originUrl: String!, $subIds: [String!]) {
    generateShortLink(input: { originUrl: $originUrl, subIds: $subIds }) {
      shortLink
    }
  }
`;

export const PRODUCT_OFFER_V2_QUERY = `
  query ProductOfferV2($itemId: Int64, $shopId: Int64, $keyword: String, $sortType: Int, $page: Int, $isAMSOffer: Boolean, $isKeySeller: Boolean, $limit: Int) {
    productOfferV2(itemId: $itemId, shopId: $shopId, keyword: $keyword, sortType: $sortType, page: $page, isAMSOffer: $isAMSOffer, isKeySeller: $isKeySeller, limit: $limit) {
      nodes {
        itemId
        commissionRate
        sellerCommissionRate
        shopeeCommissionRate
        commission
        sales
        priceMax
        priceMin
        productCatIds
        ratingStar
        priceDiscountRate
        imageUrl
        productName
        shopId
        shopName
        shopType
        productLink
        offerLink
        periodStartTime
        periodEndTime
      }
      pageInfo {
        page
        limit
        hasNextPage
      }
    }
  }
`;

export const SHOPEE_OFFER_V2_QUERY = `
  query ShopeeOfferV2($keyword: String, $sortType: Int, $page: Int, $limit: Int) {
    shopeeOfferV2(keyword: $keyword, sortType: $sortType, page: $page, limit: $limit) {
      nodes {
        commissionRate
        imageUrl
        offerLink
        originalLink
        offerName
        offerType
        categoryId
        collectionId
        periodStartTime
        periodEndTime
      }
      pageInfo {
        page
        limit
        hasNextPage
      }
    }
  }
`;

export const LIST_ITEM_FEEDS_QUERY = `
  query ListItemFeeds($feedMode: FeedMode) {
    listItemFeeds(feedMode: $feedMode) {
      feeds {
        datafeedId
        datafeedName
        referenceId
        description
        totalCount
        date
        feedMode
      }
    }
  }
`;

export const GET_ITEM_FEED_DATA_QUERY = `
  query GetItemFeedData($datafeedId: String!, $offset: Int, $limit: Int) {
    getItemFeedData(datafeedId: $datafeedId, offset: $offset, limit: $limit) {
      rows {
        columns
        updateType
      }
      pageInfo {
        offset
        limit
        totalCount
        hasMore
      }
    }
  }
`;
