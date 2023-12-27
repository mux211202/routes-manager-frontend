package com.melihovs.routemanagerbackend.entity.routes;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "coordinates")
public class Coordinates {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private double lat;
    private double lng;

    @OneToMany(mappedBy = "coordinates")
    private Set<PlaceSearchResult> placeSearchResults;
}
