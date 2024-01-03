package com.melihovs.routemanagerbackend.routing.data;

import com.melihovs.routemanagerbackend.entity.routes.RouteType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RouteTypeGettingResponse {

    private List<RouteType> routeTypes;
}
