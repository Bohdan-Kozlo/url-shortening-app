import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { LongUrlDto } from './dto/long-url.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('url')
@Controller('url')
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Post('shorter')
  @ApiOperation({ summary: 'Generate a short URL from a long URL' })
  @ApiBody({
    description: 'The long URL to be shortened',
    type: LongUrlDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Short URL generated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid URL format.' })
  async shortenUrl(@Body() longUrlDto: LongUrlDto) {
    const shortUrl = await this.urlService.generateShortUrl(longUrlDto.longUrl);
    return { shortUrl };
  }

  @Get(':shortUrl')
  @ApiOperation({ summary: 'Redirect to the long URL from the short URL' })
  @ApiResponse({ status: 302, description: 'Redirects to the long URL.' })
  @ApiResponse({ status: 404, description: 'Short URL not found.' })
  async redirectToLongUrl(@Param('shortUrl') shortUrl: string, @Res() res) {
    const urlShort = await this.urlService.findUrlByShortUrl(shortUrl);
    return res.redirect(urlShort);
  }
}
