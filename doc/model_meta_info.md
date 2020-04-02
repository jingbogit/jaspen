/data/aspen_data 这里面的数据，带xmp尾缀是有initial pose的，带bb尾缀是有bounding box的

bounding box文件存在每个数据下，aspen_bounding_box.json

我们跑一次会生成一个微调的bounding_box，在dmt/adjusted_bbox.json

"刘竞博: 哦哦，默认是y 还是 z up? box 数据是存在什么位置？"
- - - - - - - - - - - - - - -
我不太确定，你随便下载一个数据看看，例如/data/aspen_data/Godzilla_xmp_bb_output/dmt
// confirmed z-up