package com.example.demoSecurity.apiTest.services.impl;

import com.example.demoSecurity.Shared.ResponseObject;
import com.example.demoSecurity.apiTest.mappers.ShowAllProductMapper;
import com.example.demoSecurity.apiTest.model.ShopModel;
import com.example.demoSecurity.apiTest.services.IShowAllProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShowAllProductService implements IShowAllProductService {

    @Autowired
    ShowAllProductMapper showAllProductMapper;

    @Override
    public ResponseObject showAllProductViaCategory(String cate,Integer page) {
        ResponseObject rs = new ResponseObject();
        page = 10 * page;
        rs.setData(showAllProductMapper.getAllProductViaCategory(cate, page));
        rs.setMessage("Get Data Success");
        rs.setSuccess(true);
        return rs;
    }

    @Override
    public ResponseObject showAllProductViaUser(Integer userId) {
        ResponseObject rs = new ResponseObject();
        ShopModel shopRs = showAllProductMapper.getDetailUser(userId);
        shopRs.setLsProduct(showAllProductMapper.getAllProductViaUser(userId,0));
        rs.setData(shopRs);
        rs.setMessage("Get Data Success");
        rs.setSuccess(true);
        return rs;
    }

    @Override
    public ResponseObject showAllProductViaUserPage(Integer userId, Integer page) {
        ResponseObject rs = new ResponseObject();
        page = 10 * page;
        rs.setData(showAllProductMapper.getAllProductViaUser(userId, page));
        rs.setMessage("Get Data Success");
        rs.setSuccess(true);
        return rs;
    }

}
