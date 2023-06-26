package com.example.demoSecurity.apiTest.model;

import java.util.List;

public class ShopModel {

    String shopNm;
    String desc;
    String img;
    Integer userId;
    List<ProductModel> lsProduct;

    public String getShopNm() {
        return shopNm;
    }

    public void setShopNm(String shopNm) {
        this.shopNm = shopNm;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public List<ProductModel> getLsProduct() {
        return lsProduct;
    }

    public void setLsProduct(List<ProductModel> lsProduct) {
        this.lsProduct = lsProduct;
    }
}
