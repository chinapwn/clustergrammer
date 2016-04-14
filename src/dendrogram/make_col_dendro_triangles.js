var calc_col_dendro_triangles = require('./calc_col_dendro_triangles');
var dendro_group_highlight = require('./dendro_group_highlight');
var dendro_mouseover = require('./dendro_mouseover');
var dendro_mouseout = require('./dendro_mouseout');

module.exports = function make_col_dendro_triangles(params, is_change_group = false){

  var dendro_info = calc_col_dendro_triangles(params);

  var run_transition;
  if (d3.selectAll(params.root+' .col_dendro_group').empty()){
    run_transition = false;
  } else {
    run_transition = true;
    d3.selectAll(params.root+' .col_dendro_group').remove();
  }

  if (is_change_group){
    run_transition = false;
  }

  d3.select(params.root+' .col_dendro_container')
    .selectAll('path')
    .data(dendro_info, function(d){return d.name;})
    .enter()
    .append('path')
    .style('opacity',0)
    .attr('class','col_dendro_group')
    .attr('d', function(d) {

      // up triangle
      var start_x = d.pos_top;
      var start_y = 0 ;
      
      var mid_x = d.pos_mid;
      var mid_y = 30;

      var final_x = d.pos_bot;
      var final_y = 0;

      var output_string = 'M' + start_x + ',' + start_y + ', L' +
      mid_x + ', ' + mid_y + ', L' 
      + final_x + ','+ final_y +' Z';

      return output_string;
    })
    .style('fill','black')
    .on('mouseover', function(d){
      var inst_rc;
      if (params.sim_mat){
        inst_rc = 'both';
      } else {
        inst_rc = 'col';
      }
      dendro_mouseover(this);
      dendro_group_highlight(params, this, d, inst_rc);
    })
    .on('mouseout', function(){
      if (params.viz.inst_order.col === 'clust'){
        d3.select(this)
          .style('opacity',params.viz.dendro_opacity);
      }
      d3.selectAll(params.root+' .dendro_shadow')
        .remove();
      dendro_mouseout(this);
    });

  var triangle_opacity;

  if (params.viz.inst_order.row === 'clust'){
    triangle_opacity = params.viz.dendro_opacity;
  } else {
    triangle_opacity = 0;
  }

  if (run_transition){

    d3.select(params.root+' .col_dendro_container')
      .selectAll('path') 
      .transition().delay(1000).duration(1000)
      .style('opacity', triangle_opacity);

  } else {

    d3.select(params.root+' .col_dendro_container')
      .selectAll('path') 
      .style('opacity', triangle_opacity);

  }

};