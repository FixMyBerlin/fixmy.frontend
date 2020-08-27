find . -regex ".*ts$" | while read line;
 do 
    A=`basename ${line} | sed 's/ts$/js/g'`;
    B=`dirname ${line}`;
    mv ${line} "${B}/${A}";
 done


