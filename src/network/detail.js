import {request} from "./request";

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

// 整合好的数据对象
export class Product {
  // 传入需要请求的数据名称
  constructor(itemInfo, columns, shopInfo) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.price = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
		this.lowNowPrice = itemInfo.lowNowPrice;
		this.discountDesc = itemInfo.discountDesc;
		this.columns = columns;
		this.services = shopInfo.services;
  }
}

export class ProductParams {
  constructor(info, rule) {
    // 做判断，有些可能存在，有些不存在
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.rules = rule.tables;
  }
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

// 整合好的店铺信息
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.productCount = shopInfo.cGoods;
  }
}
