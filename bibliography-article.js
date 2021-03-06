  /***
*     @author Victor Chimenti, MSCS 2020
*     @file article-content-type.js
*
*     This project is intended for the Ethics and Transformative
*     Technologies initiative, although this content type should easily be
*     exportable to other teams.
*
*     This content type will work in conjunction with the Organizer and each item
*     will contain one searchable, article. The filter/search tool created in
*     in conjunction with this content type will complete to full application.
*
*     Document will write once when the page loads
*
*     @version 3.1
*/

try {
  /* -- Store all the things -- */
  var articleTitle = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Title' output='normal' display_field='value' />");
  var externalArticleLink = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='External Article Link' output='normal' display_field='value' />");
  var articleSummary = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Article Summary' output='normal' display_field='value' />");
  // var summary = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Summary' output='normal' display_field='value' />");
  var articleTags = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Tags' output='normal' display_field='value' />");
  var publisher = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Publication' output='normal' display_field='value' />");
  var author = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Author' output='normal' display_field='value' />");
  var publicationDate = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Publication Date' output='normal' display_field='value' />");
  var keyWords = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Searchable Keyword' output='normal' display_field='value' />");
  var listOfTags = '';
  var dateOnly = '';



  /* parse the time from the date field to display only the date */
  if (publicationDate != '') {
    var arrayOfDateTime = publicationDate.split(' ');
    var dateArr = '';
    /* begin parsing array at one to remove leading day of week, begin at zero to include day of week */
    for (let i = 1; i < 4; i++) {
      dateOnly += arrayOfDateTime[i] + ' ';
    }
  }

  /* parse the list of tags, add <li> tags*/
  if (articleTags != '') {
    var arrayOfTags = articleTags.split(',');
    for (let i = 0; i < arrayOfTags.length; i++) {
      listOfTags += '<li class="tag">' + arrayOfTags[i] + '</li>';
    }
    listOfTags = '<ul class="tags">' + listOfTags + '</ul>';
  }



  /* -- Prepare all the things -- */
  var beginningHTML = '<div class="knowledgeBaseItemWrapper" id="id<t4 type=\'meta\' meta=\'content_id\' />"><div class="knowledgeBaseItem standardContent">';
  var published = '<div class="publicationDate" style="display:inline-block">' + dateOnly + '</div>';
  var endingHTML = '</div></div>';


  /* -- Write all the things -- */
  document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, beginningHTML));
  document.write('<div class="summaryWrapper">');
  document.write('<div class="titleAnchor"><h4><a href="' + externalArticleLink + '" title="' + publisher + ': ' + articleTitle + '" target="_blank" >' + articleTitle + '</a></h4></div>');
  
  if (articleSummary != "") {
    document.write('<div class="summary">' + articleSummary + '</div>');
  } else {
    document.write('<div class="summary" style="display: none">No Summary Entered</div>');
  }
  
  document.write(listOfTags);
  document.write('<div class="publisher">' + publisher + '</div>');
  document.write('<div class="author">' + author + '</div>');
  document.write(published);


  document.write('<div class="keywords" style="display:none;" aria-hidden="true">' + keyWords + '</div>');
  document.write('</div>'); // close summaryWrapper

  document.write(endingHTML);

} catch (err) {
  document.write(err.message);
}
