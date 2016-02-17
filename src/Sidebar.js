/* Represents sidebar with controls.
 */
module.exports = function(params, viz) {

  var button_data = [
      {'name':'Cluster',
       'short_name':'clust'},
      {'name':'Rank',
      'short_name':'rank'}
    ];

  var sidebar = d3
    .select(params.root)
    .append('div')
    .attr('class', params.sidebar.sidebar_class )
    .style('margin-left','10px')
    .style('float', 'left');

  sidebar
    .append('div')
    .html('Row Order');

  var row_reorder = sidebar
    .append('div')
    .classed('viz_medium_text',true)
    .append('div')
    .classed('btn-group-vertical',true)
    .classed('toggle_col_order',true)
    .attr('role','group')

  row_reorder
    .selectAll('.button')
    .data(button_data)
    .enter()
    .append('button')
    .attr('type','button')
    .classed('btn',true)
    .classed('btn-primary',true)
    .classed('active', function(d){
      var is_active = false;
      if (d.name == 'Cluster'){
        var is_active = true;
      }
      return is_active;
    })
    .attr('name', function(d){
      return d.short_name;
    })
    .html(function(d){return d.name;})

  sidebar
    .append('div')
    .html('Column Order');

  var col_reorder = sidebar
    .append('div')
    .classed('viz_medium_text',true)
    .append('div')
    .classed('btn-group-vertical',true)
    .classed('toggle_row_order',true)
    .attr('role','group')

  col_reorder
    .selectAll('.button')
    .data(button_data)
    .enter()
    .append('button')
    .attr('type','button')
    .classed('btn',true)
    .classed('btn-primary',true)
    .classed('active', function(d){
      var is_active = false;
      if (d.name == 'Cluster'){
        var is_active = true;
      }
      return is_active;
    })
    .attr('name', function(d){
      return d.short_name;
    })
    .html(function(d){return d.name;})

  var search_container = sidebar
    .append('div')
    .classed('row',true)
    .classed('gene_search_container',true);

  search_container
    .append('input')
    .classed('form-control',true)
    .classed('gene_search_box',true)
    .attr('type','text')
    .attr('placeholder','Input Gene');

  search_container
    .append('div')
    .classed('btn-group',true)
    .classed('gene_search_button',true)
    .attr('data-toggle','buttons')
    .append('div')
    .append('button')
    .html('Search')
    .attr('type','button')
    .classed('btn',true)
    .classed('btn-primary',true)
    .classed('submit_gene_button',true);


  var colorbar_sliders = sidebar
    .append('div')
    .classed('colorbar_sliders',true);

  colorbar_sliders
    .append('p')
    .classed('viz_medium_text',true)
    .text('Row Group Size');

  colorbar_sliders
    .append('div')
    .classed('slider_row',true)

  colorbar_sliders
    .append('p')
    .classed('viz_medium_text',true)
    .text('Column Group Size');

  colorbar_sliders
    .append('div')
    .classed('slider_col',true)    

  var row_filters = sidebar
    .append('div')
    .classed('row_filters',true);

  row_filters
    .append('div')
    .classed('viz_medium_text',true)
    .classed('N_row_sum',true)
    .text('Top rows: all rows');

  row_filters
    .append('div')
    .classed('slider_filter',true)
    .classed('slider_N_row_sum',true);

  // 1. Recreate sidebar in JavaScript from HTML.
  // 2. Rename all IDs to classes.
  //    Don't forget load_clustergram.js
  // 3. Move behavior in load_clustergram.js to sidebar.js
  //    Example of advanced behavior:
  //
  //    if (params.use_controls) {
  //       sidebar.select(params.root).append('div').....

};