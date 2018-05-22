package com.onboarder.web.transformer;

import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.resource.ResourceTransformer;
import org.springframework.web.servlet.resource.ResourceTransformerChain;

import org.springframework.web.servlet.resource.TransformedResource;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

import static java.nio.charset.StandardCharsets.UTF_8;

public class pageTransFormer implements ResourceTransformer {
    @Override
    public Resource transform(HttpServletRequest request, Resource resource, ResourceTransformerChain transformerChain) throws IOException {
        String html = IOUtils.toString(resource.getInputStream(), UTF_8);
        html = html.replace("</head>"
                ,
                "<script type=\"text/javascript\" src=\"http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js\"></script>\n" +
                        "<script type=\"text/javascript\" src=\"./js/test-code.js\"></script>\n" +
                        "</head>");
        return new TransformedResource(resource, html.getBytes());
    }
}
