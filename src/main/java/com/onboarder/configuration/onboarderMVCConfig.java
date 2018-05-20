package com.onboarder.configuration;

import com.onboarder.web.transformer.pageTransFormer;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class onboarderMVCConfig  extends WebMvcConfigurerAdapter {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/test-page.html")
                .addResourceLocations("classpath:/static/")
                .resourceChain(false)
                .addTransformer(new pageTransFormer());
    }
}
