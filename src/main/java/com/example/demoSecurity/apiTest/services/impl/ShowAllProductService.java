package com.example.demoSecurity.apiTest.services.impl;

import com.example.demoSecurity.Shared.ResponseObject;
import com.example.demoSecurity.apiTest.mappers.ShowAllProductMapper;
import com.example.demoSecurity.apiTest.model.ShopModel;
import com.example.demoSecurity.apiTest.services.IShowAllProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class ShowAllProductService implements IShowAllProductService {

    @Autowired
    ShowAllProductMapper showAllProductMapper;

    @Override
    public ResponseObject showAllProductViaCategory(String cate,Integer page, Integer edit) {
        ResponseObject rs = new ResponseObject();
        page = 10 * page;
        rs.setData(showAllProductMapper.getAllProductViaCategory(cate, page, edit));
        rs.setMessage("Get Data Success");
        rs.setSuccess(true);
        return rs;
    }

    @Override
    public ResponseObject showAllProductViaUser(Integer userId, Integer edit) {
        ResponseObject rs = new ResponseObject();
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        ShopModel shopRs = showAllProductMapper.getDetailUser(getUserEmail(userId).getEmail());
        shopRs.setLsProduct(showAllProductMapper.getAllProductViaUser(getUserEmail(userId).getEmail(),0, edit));
        rs.setData(shopRs);
        rs.setMessage("Get Data Success");
        rs.setSuccess(true);
        return rs;
    }

    @Override
    public ResponseObject showAllProductViaUserPage(Integer userId, Integer page, Integer edit) {
        ResponseObject rs = new ResponseObject();
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        page = 10 * page;
        rs.setData(showAllProductMapper.getAllProductViaUser(getUserEmail(userId).getEmail(), page,edit));
        rs.setMessage("Get Data Success");
        rs.setSuccess(true);
        return rs;
    }

    @Override
    public ResponseObject getTotalData(String cateCd, Integer userId, Integer edit) {
        ResponseObject rs = new ResponseObject();
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(userId == 0){
            rs.setData(showAllProductMapper.countTotalProductCate(cateCd, userId,edit));
            rs.setMessage("Get Data Success");
            rs.setSuccess(true);
        }else {
            rs.setData(showAllProductMapper.countTotalProductUser(cateCd, getUserEmail(userId).getEmail(),edit));
            rs.setMessage("Get Data Success");
            rs.setSuccess(true);
        }
        return rs;
    }

    public ShopModel getUserEmail(Integer userId){
        return showAllProductMapper.getUserEmail(userId);
    }
}
