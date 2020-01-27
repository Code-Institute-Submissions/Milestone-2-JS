let map;
            let markers=[];
            let infoWindow;

            let locations = [
                {
                    name: 'one',
                    tour: 'bars',
                    latlng: { lat: 53.343044, lng: -6.258788 },
                    content: 'Dingle Whiskey Bar',
                },
                {
                    name: 'one',
                    tour: 'bars',
                    latlng: { lat: 53.345442, lng: -6.264168 },
                    content: 'The Temple Bar Whiskey Tasting Room',
                },
                {
                    name: 'one',
                    tour: 'bars',
                    latlng: { lat: 53.340548, lng: -6.258754 },
                    content: '37 Dawson Street',
                },
                {
                    name: 'two',
                    tour: 'museum',
                    latlng: { lat: 53.344206, lng: -6.259502 },
                    content: 'Irish Whiskey Museum'
                },
                {
                    name: 'two',
                    tour: 'gothic',
                    latlng: { lat: 41.3840, lng: 2.1762 },
                    content: 'annoying'
                }
            ];


            function initMap() {
            var map = new google.maps.Map(document.getElementById("map"), {
                zoom: 13,
                center: {
                    lat: 53.350234,
                    lng: -6.260183
                }
            });



                const addmarker=function(args){
                    let mkr=new google.maps.Marker({
                        position: args.latlng,
                        map: map
                    });
                    if( args.hasOwnProperty('icon') ) mkr.setIcon( args.icon );
                    if( args.hasOwnProperty('name') ) mkr.name=args.name;
                    if( args.hasOwnProperty('content') ) mkr.content=args.content;

                    google.maps.event.addListener( mkr, 'click', clickhandler );
                    return mkr;
                };
                const clickhandler=function(e){
                    infoWindow.open( map, this );
                    infoWindow.setContent( this.content );
                };
                const clearmarkers=function(){
                    markers.forEach( mkr=>{
                        mkr.setMap( null );
                    });
                };

                Array.prototype.slice.call( document.querySelectorAll('input[type="radio"][name="tour"]') ).forEach(function(input){
                    input.addEventListener('click', function(e){
                        if( this.value ){
                            /* clear any markers added to the map already */
                            clearmarkers();

                            /* only show those that qualify based upon selected tour */
                            locations.forEach( obj=>{
                                if( obj.tour==this.value ) markers.push( addmarker.call( this, obj ) );
                            });
                        }
                    });
                });
            }