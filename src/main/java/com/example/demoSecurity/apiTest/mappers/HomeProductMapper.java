package com.example.demoSecurity.apiTest.mappers;
import com.example.demoSecurity.apiTest.model.CateModel;
import com.example.demoSecurity.apiTest.model.ProductModel;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface HomeProductMapper {
    List<ProductModel> getNewestProduct();

    List<CateModel> getAllCategory();
}
